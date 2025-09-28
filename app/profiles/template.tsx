import { TemplateWrapper } from '../../wrappers/TemplateWrapper';

export default function ProfileTemplate({ children }: { children: React.ReactNode }) {
  return <TemplateWrapper>{children}</TemplateWrapper>;
}
