import type { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export type TubeLabelShape = 'square' | 'circle';

interface LabeledTubeArtworkProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  imageSrc: string;
  alt: string;
  labelColor: string;
  labelShape?: TubeLabelShape;
}

/** 复用实验场景中的“试管底图 + 标签色块”绘制方式。 */
export function LabeledTubeArtwork({
  imageSrc,
  alt,
  labelColor,
  labelShape = 'square',
  className,
  ...props
}: LabeledTubeArtworkProps) {
  return (
    <div className={cn('relative shrink-0', className)} {...props}>
      <img
        src={imageSrc}
        className="absolute inset-0 h-full w-full object-contain"
        alt={alt}
        draggable={false}
      />
      <span
        className={cn(
          'pointer-events-none absolute border-[0.5px] border-slate-800/80',
          labelShape === 'circle'
            ? 'left-[36%] top-[43%] aspect-square w-[19%] rounded-full'
            : 'left-[36%] top-[47%] h-[16%] w-[28%]',
        )}
        style={{ backgroundColor: labelColor }}
      />
    </div>
  );
}
