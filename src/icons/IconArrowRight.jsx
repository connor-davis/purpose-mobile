import { Icon } from '@hope-ui/solid';

let IconArrowRight = (props) => {
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
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </Icon>
  );
};

export default IconArrowRight;
