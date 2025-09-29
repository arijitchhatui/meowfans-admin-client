import { AppBottomNav } from '@/components/AppBottomNav';
import { AppSidebar } from '@/components/AppSideBar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { fetchRequest } from '@/hooks/api/useAPI';
import { CreatorContextWrapper } from '@/hooks/context/CreatorContextWrapper';
import { AppConfig } from '@/lib/app.config';
import { authCookieKey, FetchMethods, UserRoles } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getClient } from '@/packages/gql/ApolloClient';
import { ApolloWrapper } from '@/packages/gql/ApolloWrapper';
import { GET_CREATOR_PROFILE_QUERY } from '@/packages/gql/api/creatorAPI';
import { GetCreatorProfileQuery } from '@/packages/gql/generated/graphql';
import { configService } from '@/util/config';
import { buildSafeUrl, decodeJwtToken } from '@/util/helpers';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata = {
  metadataBase: new URL(AppConfig.siteUrl),
  title: {
    template: AppConfig.template,
    default: AppConfig.title
  },
  alternates: {
    canonical: AppConfig.canonical
  },
  manifest: AppConfig.manifest,
  applicationName: AppConfig.applicationName,
  description: AppConfig.description,
  openGraph: {
    siteName: AppConfig.site_name,
    title: AppConfig.title,
    description: AppConfig.description,
    type: AppConfig.type as 'website',
    locale: AppConfig.locale,
    url: AppConfig.siteUrl
  },
  generator: 'Next.js',
  keywords: AppConfig.keywords,
  icons: AppConfig.icons
} satisfies Metadata;

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--primary-font', style: 'normal' });
export const viewport: Viewport = {
  themeColor: '#FFFFFF'
};

interface Props {
  children: React.ReactNode;
}

const verifyAccessToken = async (token: string) => {
  const data = await fetchRequest({
    fetchMethod: FetchMethods.POST,
    pathName: '/auth/verify',
    init: {
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  });
  return data;
};

const getUser = async () => {
  const client = await getClient();
  const { data } = await client.query({ query: GET_CREATOR_PROFILE_QUERY });
  return data;
};

const handleValidateAuth = async () => {
  const cookiesList = await cookies();
  const accessToken = cookiesList.get(authCookieKey)?.value;

  const decodedToken = decodeJwtToken(accessToken);

  if (decodedToken && !decodedToken.roles.includes(UserRoles.ADMIN)) {
    return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  }

  if (!accessToken) return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  try {
    const response = await verifyAccessToken(accessToken);
    if (response !== null) return await getUser();
  } catch {
    return redirect(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  }
};

export default async function RootLayout({ children }: Props) {
  const user = await handleValidateAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="generator" content={metadata.generator} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(', ')} />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/icons/app_icon_20x20.svg" />
        {AppConfig.icons.map(({ rel, url }, idx) => (
          <link key={idx} rel={rel} href={url} />
        ))}
      </head>
      <body className={cn(inter.variable, 'overscroll-none')}>
        <ApolloWrapper>
          <Toaster invert position='top-center' />
          <Theme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              value={{ light: 'light', dark: 'dark' }}
            >
              <SidebarProvider>
                <AppSidebar />
                <CreatorContextWrapper creator={user as GetCreatorProfileQuery}>
                  <main className="w-full">{children}</main>
                </CreatorContextWrapper>
              </SidebarProvider>
              <AppBottomNav />
            </ThemeProvider>
          </Theme>
        </ApolloWrapper>
      </body>
    </html>
  );
}
