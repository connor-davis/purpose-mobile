import { Icon } from '@hope-ui/solid';

let IconPlus = (props) => {
  return (
    <Icon
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </Icon>
  );
};

export default IconPlus;
