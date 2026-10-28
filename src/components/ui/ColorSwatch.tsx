import type { ColorOption } from '@/types';

interface ColorSwatchProps {
  color: ColorOption;
  selected?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  ariaLabel?: string;
}

const sizeMap = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',
  lg: 'w-9 h-9',
};

export function ColorSwatch({ color, selected, disabled, size = 'md', onClick, ariaLabel }: ColorSwatchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || color.name}
      className={`relative rounded-full transition-all duration-200 ${sizeMap[size]} ${
        selected
          ? 'ring-2 ring-gold ring-offset-2 ring-offset-white'
          : 'ring-1 ring-beige-dark/25'
      } ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:ring-gold/50 cursor-pointer hover:scale-110'}`}
      style={{ backgroundColor: color.hex }}
    >
      {disabled && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="block w-full h-px bg-brown-dark rotate-45" />
        </span>
      )}
    </button>
  );
}
