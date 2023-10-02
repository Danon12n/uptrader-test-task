import './my-button.scss';
type Props = {
  children: React.ReactNode;
  onClick: any;
  type: 'primary' | 'secondary';
};

export default function Button({ children, onClick, type }: Props) {
  switch (type) {
    case 'primary':
      return (
        <button className='button-primary' onClick={onClick}>
          {children}
        </button>
      );
    case 'secondary':
      return (
        <button className='button-secondary' onClick={onClick}>
          {children}
        </button>
      );
    default:
      break;
  }
}
