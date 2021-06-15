import {
  EyeOpenIcon,
  EyeOffIcon,
  Icon,
  Pane,
  TextInputField,
  BoxComponent,
  TextInputFieldOwnProps,
} from "evergreen-ui";
import React, { useState } from "react";

const PasswordTextInputField: BoxComponent<TextInputFieldOwnProps, "input"> = ({
  ...props
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <Pane position="relative">
      <TextInputField type={hidden ? "password" : "text"} {...props} />
      <Icon
        icon={hidden ? EyeOpenIcon : EyeOffIcon}
        onClick={() => setHidden(!hidden)}
        position="absolute"
        zIndex={2}
        right={0}
        paddingRight={15}
        paddingLeft={15}
        top={16}
        cursor="pointer"
      />
    </Pane>
  );
};

export default PasswordTextInputField;
