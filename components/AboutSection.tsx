'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useTransform, type Variants } from 'framer-motion';
import { Section } from './Section';
import { Container } from './Container';
import { Badge } from './Badge';
import { useInViewOnce } from '@/hooks/useInViewOnce';

const headingWords = ['Stories', 'wired', 'for', 'the', 'neon', 'age'];
const storyCopy = [
  'We engineer layered brand stories that feel tactile, luminous, and alive. Each launch is choreographed like a film premiere—built from research insights, sonic cues, and neon-lit UI vignettes.',
  'By pairing spatial design with empathetic strategy, we hand teams a narrative system they can evolve in real time. The result: campaigns that pull people in, stay inclusive, and convert with conviction.',
];
const pillars = [
  {
    title: 'Narrative systems',
    detail: 'Modular arcs tuned for every touchpoint and grounded in real audience intent.',
  },
  {
    title: 'Spatial imagery',
    detail: 'Layered planes, volumetric glows, and subtle parallax for depth without distraction.',
  },
];
const stats = [
  { label: 'Launch uplift', value: '38%' },
  { label: 'Markets lit', value: '24' },
  { label: 'Avg. sprint', value: '10 days' },
];

export const AboutSection = () => {
  const { ref, hasIntersected } = useInViewOnce<HTMLDivElement>({ threshold: 0.35 });
  const prefersReducedMotion = useReducedMotion();

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const parallaxDepth = useMotionValue(0);

  const rotateX = useTransform(parallaxY, [-30, 30], [10, -10]);
  const rotateY = useTransform(parallaxX, [-30, 30], [-10, 10]);
  const depthScale = useTransform(parallaxDepth, [0, 1], [1, 1.08]);
  const glowOpacity = useTransform(parallaxDepth, [0, 1], [0.4, 0.85]);
  const accentX = useTransform(parallaxX, (value) => value * -0.35);
  const accentY = useTransform(parallaxY, (value) => value * 0.35);

  useEffect(() => {
    if (prefersReducedMotion) {
      parallaxX.set(0);
      parallaxY.set(0);
      parallaxDepth.set(0);
      return;
    }

    const pointerOffset = { x: 0, y: 0 };
    const scrollDepth = { value: 0 };
    let frame: number | null = null;

    const updateMotionValues = () => {
      parallaxX.set(pointerOffset.x);
      parallaxY.set(pointerOffset.y);
      parallaxDepth.set(scrollDepth.value);
      frame = null;
    };

    const scheduleUpdate = () => {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(updateMotionValues);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerOffset.x = ((event.clientX / window.innerWidth) - 0.5) * 32;
      pointerOffset.y = ((event.clientY / window.innerHeight) - 0.5) * 24;
      scheduleUpdate();
    };

    const handleScroll = () => {
      const scrollRange = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scrollDepth.value = window.scrollY / scrollRange;
      scheduleUpdate();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [parallaxDepth, parallaxX, parallaxY, prefersReducedMotion]);

  const textInitial: false | 'hidden' = prefersReducedMotion ? false : 'hidden';
  const textAnimate = prefersReducedMotion || hasIntersected ? 'visible' : 'hidden';

  const wordsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: '120%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.19, 1, 0.22, 1] as const,
      },
    },
  };

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2 + index * 0.12,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    }),
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.35 + index * 0.1,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    }),
  };

  return (
    <Section variant="dark" padding="xl" className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_top,_rgba(233,30,140,0.18),_transparent_55%)] opacity-60 blur-3xl"
        style={{ x: accentX, y: accentY }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(0,217,255,0.18),transparent_60%)]"
        style={{ opacity: glowOpacity }}
      />
      <Container maxWidth="full" className="relative mx-auto max-w-6xl">
        <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="purple"
                className="uppercase tracking-[0.35em] text-[0.65rem] text-dark-100/80"
              >
                Our Story
              </Badge>
              <motion.h2
                className="text-4xl font-semibold leading-tight text-white md:text-5xl"
                variants={wordsContainerVariants}
                initial={textInitial}
                animate={textAnimate}
              >
                {headingWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    variants={wordVariants}
                    className="mr-3 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <div className="space-y-5">
              {storyCopy.map((sentence, index) => (
                <motion.p
                  key={sentence}
                  className="text-lg leading-relaxed text-dark-200"
                  variants={paragraphVariants}
                  custom={index}
                  initial={textInitial}
                  animate={textAnimate}
                >
                  {sentence}
                </motion.p>
              ))}
            </div>

            <div className="space-y-4">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  className="rounded-2xl border border-dark-700/70 bg-dark-900/60 p-4 backdrop-blur-md"
                  variants={itemVariants}
                  custom={index}
                  initial={textInitial}
                  animate={textAnimate}
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-dark-400">
                    {pillar.title}
                  </p>
                  <p className="mt-2 text-base text-dark-100">{pillar.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl border border-dark-700/60 bg-gradient-to-b from-dark-900/90 to-dark-900/50 p-4 text-center"
                  variants={itemVariants}
                  custom={pillars.length + index}
                  initial={textInitial}
                  animate={textAnimate}
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.35em] text-dark-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative h-[420px] sm:h-[520px]">
            <motion.div
              aria-hidden="true"
              className="absolute inset-y-8 inset-x-4 rounded-[38px] border border-dark-700/60 bg-dark-900/70 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
              style={{
                x: parallaxX,
                y: parallaxY,
                rotateX,
                rotateY,
                scale: depthScale,
                transformPerspective: 1100,
              }}
            >
              <div className="absolute inset-6 rounded-[32px] border border-white/5 bg-gradient-to-br from-dark-900/60 via-dark-800/20 to-transparent" />
              <div className="absolute left-10 right-10 top-16 h-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan opacity-80" />
              <div className="absolute inset-x-10 top-28 space-y-3 text-sm text-dark-200">
                <p className="font-semibold text-white">Launch narrative</p>
                <p className="text-dark-300">
                  Sequenced beats that pulse with user intent, letting audiences feel the build before the reveal.
                </p>
              </div>
              <div className="absolute inset-x-10 bottom-16 grid grid-cols-2 gap-6 text-xs uppercase tracking-[0.25em] text-dark-400">
                <div>
                  <p className="text-lg font-semibold text-white">Pulse</p>
                  <p className="mt-1 text-dark-300">Live analytics</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-neon-cyan">Glow</p>
                  <p className="mt-1 text-dark-300">Emotive cues</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute -right-6 top-6 h-32 w-32 rounded-3xl border border-neon-cyan/40 bg-neon-cyan/10 blur-2xl"
              style={{ x: accentX, y: accentY }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -left-6 bottom-4 h-40 w-40 rounded-full bg-gradient-to-br from-neon-purple/40 via-transparent to-neon-lime/40 blur-[120px]"
              style={{ scale: depthScale }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
