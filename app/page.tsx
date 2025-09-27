'use client';

import { GET_CREATOR_PROFILE_QUERY } from '@/packages/gql/api/creatorAPI';
import { useUserStore } from '@/zustand/user.store';
import { useQuery } from '@apollo/client/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data } = useQuery(GET_CREATOR_PROFILE_QUERY);
  const { setUser, user } = useUserStore();
  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
  }, [data, user, setUser]);

  redirect('/vaults');
}
