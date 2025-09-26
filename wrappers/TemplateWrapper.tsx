import React from 'react';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TemplateWrapper: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div className="w-full py-17 md:pb-0" {...props}>
      {children}
    </div>
  );
};
