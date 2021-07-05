import {NextArrowActive, PreArrowActive, NextArrowDisable, PreArrowDisable} from '@images/index.js'

type Props = {
  type?: 'next' | 'pre';
  active?: boolean;
  className?: string;
  style?: any;
  onClick?: () => void;
};

const ArrowCarousel = ({ type = 'next', active = true, className, style, onClick }: Props) => (
  <div className={`arrow-carousel arrow-carousel-${type} ${className}`} style={style} onClick={onClick}  >
    {type==='next' && active && <NextArrowActive/>} 
    {type==='next' && !active && <NextArrowDisable/>} 
    {type==='pre' && active && <PreArrowActive/>} 
    {type==='pre' && !active && <PreArrowDisable/>} 
  </div>
);

export default ArrowCarousel;