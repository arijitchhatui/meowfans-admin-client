import { TemplateWrapper } from '@/wrappers/TemplateWrapper';

interface Props {
  children: React.ReactNode;
}

export default function MoreTemplate({ children }: Props) {
  return <TemplateWrapper>{children}</TemplateWrapper>;
}
