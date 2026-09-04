'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  GoogleLogo,
  Sun,
  Moon,
  Megaphone,
  CodeSimple,
} from '@phosphor-icons/react';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Divider } from '@/components/ui/Divider';
import { IconButton } from '@/components/ui/IconButton';
import { DotSwirl } from '@/components/ui/DotSwirl';
import { CardCarousel } from '@/components/ui/CardCarousel';
import { useDemoState } from '@/components/demo-state';
import { developerTourSteps } from '@/lib/developer-tour';
import { useMounted } from '@/lib/use-mounted';
import styles from './login.module.css';

type Step = 'workspace' | 'email' | 'sent';
type Workspace = 'advertiser' | 'developer';

const WORKSPACE_SUBTITLE: Record<Workspace, string> = {
  advertiser: 'Sign in to run ads across the network.',
  developer: 'Sign in to monetize your AI product.',
};

const WORKSPACE_TITLE: Record<Workspace, string> = {
  advertiser: 'Continue as Advertiser',
  developer: 'Continue as Developer',
};

const CAROUSEL_ITEMS = [
  {
    title: 'Match',
    description:
      'Kili scores every eligible sponsor against the buying intent in the query and drops anything below your floor.',
  },
  {
    title: 'Serve',
    description:
      'Loading placement, in-answer text or display card inventory brands cannot buy anywhere else, rendered inside your own interface.',
  },
  {
    title: 'Measure',
    description:
      'Closed-loop measurement with CAPI, so a CPM buy can still be judged on what it actually produced.',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { isNewUser, startDeveloperTour, closeDeveloperTour } = useDemoState();
  const [step, setStep] = useState<Step>('workspace');
  const [workspace, setWorkspace] = useState<Workspace>('advertiser');
  const [email, setEmail] = useState('');
  const isDark = theme === 'dark';

  const goToOverview = (workspace: Workspace) => {
    if (workspace === 'developer') {
      if (isNewUser) {
        startDeveloperTour();
        router.push(developerTourSteps[0].route);
        return;
      }
      closeDeveloperTour();
      router.push('/developer/overview');
      return;
    }
    router.push(`/${workspace}/overview`);
  };

  const chooseWorkspace = (value: Workspace) => {
    setWorkspace(value);
    setStep('email');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.split}>
        <div className={styles.leftPanel}>
          <DotSwirl />
          <div className={styles.leftPanelContent}>
            <CardCarousel items={CAROUSEL_ITEMS} />
          </div>
        </div>

        <div className={styles.card}>
          <Logo height={28} className={styles.logo} />

          {step === 'email' && (
            <Tabs
              items={[
                { value: 'advertiser', label: 'Advertiser' },
                { value: 'developer', label: 'Developer' },
              ]}
              value={workspace}
              onChange={(value) => setWorkspace(value as Workspace)}
              className={styles.workspaceTabs}
            />
          )}

          <div className={styles.content}>
            {step === 'workspace' && (
              <>
                <div className={styles.title}>Welcome</div>
                <div className={styles.subtitle}>
                  Choose how you want to use Kili.
                </div>
                <div className={styles.workspaceOptions}>
                  <button
                    type='button'
                    className={styles.workspaceOption}
                    onClick={() => chooseWorkspace('advertiser')}
                  >
                    <span className={styles.workspaceOptionIconBox}>
                      <Megaphone size={20} weight='bold' />
                    </span>
                    <span className={styles.workspaceOptionTitle}>
                      Continue as Advertiser
                    </span>
                    <span className={styles.workspaceOptionDesc}>
                      Run ads across the network and reach new customers.
                    </span>
                  </button>
                  <button
                    type='button'
                    className={styles.workspaceOption}
                    onClick={() => chooseWorkspace('developer')}
                  >
                    <span className={styles.workspaceOptionIconBox}>
                      <CodeSimple size={20} weight='bold' />
                    </span>
                    <span className={styles.workspaceOptionTitle}>
                      Continue as Developer
                    </span>
                    <span className={styles.workspaceOptionDesc}>
                      Host ads in your AI product and monetize traffic.
                    </span>
                  </button>
                </div>
              </>
            )}

            {step === 'email' && (
              <>
                <div className={styles.title}>{WORKSPACE_TITLE[workspace]}</div>
                <div className={styles.subtitle}>
                  {WORKSPACE_SUBTITLE[workspace]}
                </div>

                <Button
                  type='button'
                  variant='primary'
                  style={{ width: '100%' }}
                  onClick={() => goToOverview(workspace)}
                >
                  <GoogleLogo weight='bold' size={18} />
                  Continue with Google
                </Button>

                <div className={styles.divider}>
                  <Divider />
                  <span>or</span>
                  <Divider />
                </div>

                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep('sent');
                  }}
                >
                  <Input
                    type='email'
                    placeholder='you@example.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    type='submit'
                    variant='secondary'
                    style={{ width: '100%' }}
                  >
                    Email me a link
                  </Button>
                </form>
              </>
            )}

            {step === 'sent' && (
              <>
                <div className={styles.title}>Check your inbox</div>
                <div className={styles.subtitle}>
                  We sent a sign-in link to the email below.
                </div>
                <Input type='email' value={email} disabled />
                <button
                  type='button'
                  className={styles.useDifferentEmail}
                  onClick={() => {
                    setEmail('');
                    setStep('email');
                  }}
                >
                  Use a different email
                </button>
              </>
            )}
          </div>

          <div className={styles.footer}>
            <div className={styles.footerLinks}>
              <a href='#' onClick={(e) => e.preventDefault()}>
                Terms of Service
              </a>
              <a href='#' onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </a>
            </div>
            <IconButton
              label='Toggle theme'
              variant='secondary'
              style={mounted ? undefined : { visibility: 'hidden' }}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
            >
              {mounted && isDark ? (
                <Sun size={16} weight='bold' />
              ) : (
                <Moon size={16} weight='bold' />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
