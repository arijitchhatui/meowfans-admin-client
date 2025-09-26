import { authCookieKey, authRefreshCookieKey, TokenType, UserRoles } from '@/lib/constants';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { configService } from './config';

export const isValidEmail = (email: string) => {
  return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const isValidPassword = (password: string) => {
  return password.length >= 8;
};

export const BearerAccessToken = () => {
  return `Bearer ${getCookie(authCookieKey)}`;
};

export const BearerRefreshToken = () => {
  return `Bearer ${getCookie(authRefreshCookieKey)}`;
};

export interface JwtUser {
  sub: string; // holds userId
  jti: string; // JWT ID
  iat: number; // issued at
  exp: number; // expiration time
  version: string;
  type: TokenType;
  roles: UserRoles[];
  ip: string;
  userAgent: string;
  associated_access_token_jti: string;
}

export const buildSafeUrl = (input: { host: string; pathname?: string }) => {
  try {
    const redirectUrl = new URL(input.host);
    redirectUrl.pathname = input.pathname || '/';
    return redirectUrl.toString();
  } catch {
    console.log('Failed to create url!');
    return configService.NEXT_PUBLIC_CREATOR_URL;
  }
};

export const decodeJwtToken = (token?: string): JwtUser | null => {
  try {
    if (!token) return null;
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export type buttonSize = 'default' | 'lg' | 'sm' | 'icon';
export type buttonVariant = 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null;

export const handleFullScreen = (url: string, startIndex: number, imageUrls: string[]) => {
  let currentIndex = startIndex;

  const image = document.createElement('img');
  image.src = url;
  image.style.maxWidth = '100%';
  image.style.maxHeight = '100%';
  image.style.margin = 'auto';
  image.style.display = 'block';

  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'center';
  wrapper.style.alignItems = 'center';
  wrapper.style.background = 'black';
  wrapper.style.position = 'relative';

  const nextButton = document.createElement('button');
  nextButton.innerText = '➡️';
  nextButton.style.position = 'absolute';
  nextButton.style.right = '20px';
  nextButton.style.top = '50%';
  nextButton.style.transform = 'translateY(-50%)';
  nextButton.style.padding = '0px';
  nextButton.style.background = 'rgba(255,255,255,0.2)';
  nextButton.style.color = 'white';
  nextButton.style.border = 'none';
  nextButton.style.cursor = 'pointer';
  nextButton.style.fontSize = '24px';
  nextButton.onclick = () => {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    image.src = imageUrls[currentIndex];
  };

  const previousButton = document.createElement('button');
  previousButton.innerText = '⬅️';
  previousButton.style.position = 'absolute';
  previousButton.style.left = '20px';
  previousButton.style.top = '50%';
  previousButton.style.transform = 'translateY(-50%)';
  previousButton.style.padding = '0px';
  previousButton.style.background = 'rgba(255,255,255,0.2)';
  previousButton.style.color = 'white';
  previousButton.style.border = 'none';
  previousButton.style.cursor = 'pointer';
  previousButton.style.fontSize = '24px';
  previousButton.onclick = () => {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    image.src = imageUrls[currentIndex];
  };

  const closeButton = document.createElement('button');
  closeButton.innerText = '❌';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '20px';
  closeButton.style.right = '20px';
  closeButton.style.padding = '0px';
  closeButton.style.background = 'rgba(255,255,255,0.2)';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontSize = '20px';
  closeButton.onclick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      exitHandler();
    }
  };

  wrapper.appendChild(image);
  wrapper.appendChild(nextButton);
  wrapper.appendChild(previousButton);
  wrapper.appendChild(closeButton);
  document.body.appendChild(wrapper);

  if (wrapper.requestFullscreen) wrapper.requestFullscreen();

  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') previousButton.click();
    if (e.key === 'Escape') closeButton.click();
  };

  const exitHandler = () => {
    if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    document.removeEventListener('keydown', keyHandler);
  };

  const onFullscreenChange = () => {
    if (!document.fullscreenElement) exitHandler();
  };

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('keydown', keyHandler);
};
