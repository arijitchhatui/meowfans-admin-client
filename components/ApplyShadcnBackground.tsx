'use client';

import { BgColor, ShadCnBackgrounds } from '@/lib/constants';
import { Div } from '@/wrappers/HTMLWrappers';
import { useShadCnBackgroundStore } from '@/zustand/background.store';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Boxes } from './ui/shadcn-io/background-boxes';
import FiberWaves from './ui/shadcn-io/fiber-waves';
import { FlickeringGrid } from './ui/shadcn-io/flickering-grid';
import Galaxy from './ui/shadcn-io/galaxy';
import { RetroGrid } from './ui/shadcn-io/retro-grid';
import { Squares } from './ui/shadcn-io/squares-background';
import { Vortex } from './ui/shadcn-io/vortex';
import { WarpBackground } from './ui/shadcn-io/warp-background';
import { WavyBackground } from './ui/shadcn-io/wavy-background';

interface Props {
  children?: React.ReactNode;
  background?: ShadCnBackgrounds | null;
}

export const ApplyShadCnBackground: React.FC<Props> = ({ children, background = null }) => {
  const { theme, systemTheme } = useTheme();
  const [bg, setBg] = useState<string>(systemTheme as string);

  const { shadCnBackground } = useShadCnBackgroundStore();

  useEffect(() => {
    let localTheme = BgColor.BLACK;
    if (systemTheme && theme === 'light') localTheme = BgColor.WHITE;
    else if (systemTheme === 'light' && theme === 'system') localTheme = BgColor.WHITE;
    setBg(localTheme);
  }, [theme, systemTheme]);

  switch (shadCnBackground || background) {
    case ShadCnBackgrounds.FLICKERING:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <FlickeringGrid
              className="absolute inset-0"
              squareSize={4}
              gridGap={6}
              flickerChance={0.3}
              color="rgb(100, 100, 100)"
              maxOpacity={0.2}
            />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.RETRO:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <RetroGrid angle={65} cellSize={60} opacity={0.5} lightLineColor="#00ff41" darkLineColor="#00ff41" />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.WARP:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <WarpBackground
              perspective={100}
              beamsPerSide={4}
              beamSize={6}
              beamDuration={2.5}
              className="flex items-center justify-center h-[calc(100vh)]"
            />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.BOX:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <Boxes className="absolute inset-0" />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.FIBER_WAVES:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <FiberWaves color={[0.8, 0.4, 1]} amplitude={1.2} distance={0.3} enableMouseInteraction={false} />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.VORTEX:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <Vortex backgroundColor={bg} rangeY={800} particleCount={500} baseHue={120} />
          </Div>
          <Div className="relative z-10 w-full overflow-y-auto h-screen flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.SQUARES_BACKGROUND:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <Squares
              direction="diagonal"
              speed={0.5}
              squareSize={40}
              borderColor="rgba(0, 0, 0, 0.1)"
              hoverFillColor="rgba(59, 130, 246, 0.1)"
            />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.GALAXY:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <Galaxy
              focal={[0.5, 0.5]}
              rotation={[0.8, 0.6]}
              starSpeed={0.7}
              density={1.2}
              hueShift={180}
              speed={1.5}
              mouseInteraction={false}
              glowIntensity={0.4}
              saturation={0.3}
              mouseRepulsion={false}
              twinkleIntensity={0.4}
              rotationSpeed={0.05}
              repulsionStrength={1.5}
              transparent={false}
            />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    case ShadCnBackgrounds.WAVY:
      return (
        <Div className="relative flex items-center justify-center w-full h-[calc(100vh)] overflow-hidden">
          <Div className="absolute inset-0 w-full h-full">
            <WavyBackground
              backgroundFill={bg}
              colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9']}
              waveWidth={50}
              blur={10}
              speed="fast"
              waveOpacity={0.5}
            />
          </Div>
          <Div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center">{children}</Div>
        </Div>
      );

    default:
      return <>{children}</>;
  }
};
