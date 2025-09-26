import React from 'react';

/* eslint-disable @next/next/no-img-element */
interface DivProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface ParagraphProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
}

interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

interface FooterProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

interface LIProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

interface ULProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
}

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  href?: string;
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  action?: string | ((formData: FormData) => void | Promise<void>);
}

export const Div = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
Div.displayName = 'Div';

export const Typography: React.FC<ParagraphProps> = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};

export const Image: React.FC<ImageProps> = ({ alt, src, ...props }) => {
  return <img {...props} src={src} alt={alt} />;
};

export const Span: React.FC<SpanProps> = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};

export const H1: React.FC<HeadingProps> = ({ children, ...props }) => {
  return <h1 {...props}>{children}</h1>;
};

export const H2: React.FC<HeadingProps> = ({ children, ...props }) => {
  return <h2 {...props}>{children}</h2>;
};

export const H3: React.FC<HeadingProps> = ({ children, ...props }) => {
  return <h3 {...props}>{children}</h3>;
};

export const Footer: React.FC<FooterProps> = ({ children, ...props }) => {
  return <footer {...props}>{children}</footer>;
};

export const LI: React.FC<LIProps> = ({ children, ...props }) => {
  return <li {...props}>{children}</li>;
};

export const UL: React.FC<ULProps> = ({ children, ...props }) => {
  return <ul {...props}>{children}</ul>;
};

export const Anchor: React.FC<AnchorProps> = ({ children, href, ...props }) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export const Form: React.FC<FormProps> = ({ children, action, ...props }) => {
  return (
    <form action={action} {...props}>
      {children}
    </form>
  );
};
