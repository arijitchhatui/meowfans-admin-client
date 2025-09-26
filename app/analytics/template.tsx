import React from 'react';
import { TemplateWrapper } from '../../wrappers/TemplateWrapper';

interface Props {
  children: React.ReactNode;
}

export default function PageTemplate({ children }: Props) {
  return <TemplateWrapper>{children}</TemplateWrapper>;
}
