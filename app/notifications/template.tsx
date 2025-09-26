import { TemplateWrapper } from '../../wrappers/TemplateWrapper';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return <TemplateWrapper>{children}</TemplateWrapper>;
}
