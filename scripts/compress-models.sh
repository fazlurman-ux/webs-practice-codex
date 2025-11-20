#!/bin/bash

# 3D Model Compression Script
# Compresses GLTF/GLB models using gltfpack with Draco compression

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directories
SOURCE_DIR="assets/models"
OUTPUT_DIR="public/models"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}           3D Model Compression Script${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if gltfpack is installed
if ! command -v gltfpack &> /dev/null; then
    echo -e "${RED}Error: gltfpack is not installed${NC}"
    echo ""
    echo "Install with:"
    echo "  npm install -g gltfpack"
    echo ""
    echo "Or use npx:"
    echo "  npx gltfpack -i input.gltf -o output.glb -cc"
    exit 1
fi

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}Error: Source directory '$SOURCE_DIR' not found${NC}"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Compression presets
compress_basic() {
    local input=$1
    local output=$2
    echo -e "${YELLOW}Using basic compression (Draco only)${NC}"
    gltfpack -i "$input" -o "$output" -cc
}

compress_standard() {
    local input=$1
    local output=$2
    echo -e "${YELLOW}Using standard compression (Draco + textures)${NC}"
    gltfpack -i "$input" -o "$output" -cc -tc
}

compress_aggressive() {
    local input=$1
    local output=$2
    echo -e "${YELLOW}Using aggressive compression (Draco + textures + simplification)${NC}"
    gltfpack -i "$input" -o "$output" -cc -tc -si 0.7
}

compress_quality() {
    local input=$1
    local output=$2
    echo -e "${YELLOW}Using high-quality compression${NC}"
    gltfpack -i "$input" -o "$output" -cc -tc -vp 14 -vt 12 -vn 10
}

# Function to get file size in human-readable format
get_file_size() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        stat -f%z "$1" | awk '{
            size=$1;
            if (size > 1073741824) printf "%.2f GB", size/1073741824;
            else if (size > 1048576) printf "%.2f MB", size/1048576;
            else if (size > 1024) printf "%.2f KB", size/1024;
            else printf "%d B", size;
        }'
    else
        # Linux
        stat --printf="%s" "$1" | awk '{
            size=$1;
            if (size > 1073741824) printf "%.2f GB", size/1073741824;
            else if (size > 1048576) printf "%.2f MB", size/1048576;
            else if (size > 1024) printf "%.2f KB", size/1024;
            else printf "%d B", size;
        }'
    fi
}

# Process files
process_file() {
    local file=$1
    local filename=$(basename "$file")
    local output_file="$OUTPUT_DIR/${filename%.*}.glb"
    
    echo -e "${BLUE}Processing: ${filename}${NC}"
    
    # Get original size
    original_size=$(get_file_size "$file")
    echo -e "  Original size: ${original_size}"
    
    # Compress based on preset (default: standard)
    if [ "$PRESET" = "basic" ]; then
        compress_basic "$file" "$output_file"
    elif [ "$PRESET" = "aggressive" ]; then
        compress_aggressive "$file" "$output_file"
    elif [ "$PRESET" = "quality" ]; then
        compress_quality "$file" "$output_file"
    else
        compress_standard "$file" "$output_file"
    fi
    
    # Get compressed size
    if [ -f "$output_file" ]; then
        compressed_size=$(get_file_size "$output_file")
        echo -e "  ${GREEN}Compressed size: ${compressed_size}${NC}"
        echo -e "  ${GREEN}Output: ${output_file}${NC}"
    else
        echo -e "  ${RED}Failed to compress${NC}"
    fi
    
    echo ""
}

# Parse arguments
PRESET="standard"
SPECIFIC_FILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--preset)
            PRESET="$2"
            shift 2
            ;;
        -f|--file)
            SPECIFIC_FILE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  -p, --preset <preset>   Compression preset:"
            echo "                          - basic: Draco only"
            echo "                          - standard: Draco + texture compression (default)"
            echo "                          - aggressive: Standard + mesh simplification"
            echo "                          - quality: High-quality with minimal loss"
            echo "  -f, --file <filename>   Process specific file only"
            echo "  -h, --help             Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                      # Compress all files with standard preset"
            echo "  $0 -p aggressive        # Compress all with aggressive preset"
            echo "  $0 -f model.gltf        # Compress specific file"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use -h or --help for usage information"
            exit 1
            ;;
    esac
done

echo -e "Preset: ${BLUE}${PRESET}${NC}"
echo -e "Source: ${BLUE}${SOURCE_DIR}${NC}"
echo -e "Output: ${BLUE}${OUTPUT_DIR}${NC}"
echo ""

# Process files
if [ -n "$SPECIFIC_FILE" ]; then
    # Process specific file
    if [ -f "$SOURCE_DIR/$SPECIFIC_FILE" ]; then
        process_file "$SOURCE_DIR/$SPECIFIC_FILE"
    else
        echo -e "${RED}File not found: $SOURCE_DIR/$SPECIFIC_FILE${NC}"
        exit 1
    fi
else
    # Process all GLTF/GLB files
    count=0
    for file in "$SOURCE_DIR"/*.{gltf,glb}; do
        if [ -f "$file" ]; then
            process_file "$file"
            ((count++))
        fi
    done
    
    if [ $count -eq 0 ]; then
        echo -e "${YELLOW}No GLTF/GLB files found in $SOURCE_DIR${NC}"
        echo ""
        echo "Add your 3D models to $SOURCE_DIR and run this script again."
    else
        echo -e "${GREEN}✓ Processed $count file(s)${NC}"
    fi
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Compression complete!${NC}"
echo ""
echo "Compressed models are in: ${OUTPUT_DIR}"
echo ""
