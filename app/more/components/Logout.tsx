import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authCookieKey } from '@/lib/constants';
import { configService } from '@/util/config';
import { buildSafeUrl } from '@/util/helpers';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie(authCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_APP_URL }));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign out</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Button variant={'destructive'} onClick={handleLogout}>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default Logout;
