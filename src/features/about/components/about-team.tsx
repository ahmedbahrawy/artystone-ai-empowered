'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container, Section, Grid } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'
import { teamMembers } from '@/lib/media-config'

export function AboutTeam() {
  return (
    <Section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-12"
        >
          <motion.div
            variants={slideInFromBottom}
            className="mx-auto max-w-3xl space-y-4 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              Meet Our Team
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Our experienced professionals are dedicated to providing you with the highest quality care.
            </p>
          </motion.div>

          <Grid className="gap-8 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={slideInFromBottom}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="relative z-10 -mt-16 space-y-2 p-6">
                  <h3 className="font-serif text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="text-neutral-700 dark:text-neutral-300">{member.bio}</p>
                </div>
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent/0 opacity-0 blur transition-all group-hover:from-primary-500/10 group-hover:via-secondary-500/10 group-hover:to-accent/10 group-hover:opacity-100" />
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Section>
  )
} 