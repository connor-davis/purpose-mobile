import { Icon } from '@hope-ui/solid';

let IconCheck = (props) => {
  return (
    <Icon
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        fill="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5 13l4 4L19 7"
      />
    </Icon>
  );
};

export default IconCheck;