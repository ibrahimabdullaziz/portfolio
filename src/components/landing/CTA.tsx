'use client';

import { ctaConfig } from '@/config/CTA';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Mail } from 'lucide-react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { useState } from 'react';

import Container from '../common/Container';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface CallToActionProps {
  profileImage?: string;
  profileAlt?: string;
  linkText?: string;
  calLink?: string;
  preText?: string;
}

export default function CTA({
  profileImage = ctaConfig.profileImage,
  profileAlt = ctaConfig.profileAlt,
  linkText = ctaConfig.linkText,
  calLink = ctaConfig.calLink,
  preText = ctaConfig.preText,
}: CallToActionProps) {
  const { triggerHaptic, isMobile } = useHapticFeedback();
  const [showCalPopup, setShowCalPopup] = useState(false);

  const handleScheduleClick = async () => {
    if (!calLink) {
      window.location.href = '/contact';
      return;
    }
    if (isMobile()) {
      triggerHaptic('medium');
    }

    try {
      const calApi = await getCalApi();
      if (calApi) {
        calApi('on', {
          action: 'bookingSuccessful',
          callback: () => {
            setShowCalPopup(false);
          },
        });
      }
    } catch (error) {
      console.error('Failed to initialize Cal API:', error);
    }

    setShowCalPopup(true);
  };

  return (
    <>
      <Container className="mt-20 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-primary/3 p-8 md:p-12"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/8 blur-3xl" />

          <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-12">
            {/* Profile image with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative shrink-0"
            >
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-lg" />
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20 md:h-28 md:w-28">
                <Image
                  alt={profileAlt}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                  src={profileImage}
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              >
                {preText}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="mt-2 max-w-lg text-base text-muted-foreground md:text-lg"
              >
                I&apos;m currently available for full-time roles and freelance
                projects. Let&apos;s discuss how I can contribute to your team.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:items-start"
              >
                {calLink ? (
                  <button
                    onClick={handleScheduleClick}
                    className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Calendar className="h-4 w-4" />
                    {linkText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Calendar className="h-4 w-4" />
                    {linkText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                )}
                <a
                  href="mailto:ibrahimabdullaziz55@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                >
                  <Mail className="h-4 w-4" />
                  Send an Email
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Cal.com Dialog */}
      {calLink && (
        <Dialog open={showCalPopup} onOpenChange={setShowCalPopup}>
          <DialogContent className="max-h-[90vh] max-w-[calc(100vw-2rem)] overflow-hidden sm:max-w-[calc(100vw-4rem)] md:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Book a Meeting</DialogTitle>
              <DialogDescription>
                Schedule a time to connect and discuss opportunities
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[calc(90vh-220px)] overflow-y-auto rounded-lg">
              <Cal
                calLink={calLink}
                config={{
                  name: 'Portfolio Visitor',
                  email: '',
                  notes: 'Booked from portfolio website',
                }}
                className="h-[500px] w-full rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
