import {
  EyeOpenIcon,
  EyeOffIcon,
  BoxComponent,
  TextInputFieldOwnProps,
  Icon,
} from "evergreen-ui";
import React, { useState } from "react";
import IconTextInputField from "./IconTextInputField";

const PasswordTextInputField: BoxComponent<TextInputFieldOwnProps, "input"> = (
  props
) => {
  const [masked, setMasked] = useState(true);

  return (
    <IconTextInputField type={masked ? "password" : "text"} {...props}>
      <Icon
        icon={masked ? EyeOpenIcon : EyeOffIcon}
        onClick={() => setMasked(!masked)}
      />
    </IconTextInputField>
  );
};

export default PasswordTextInputField;
