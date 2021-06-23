import {
  Pane,
  TextInputField,
  BoxComponent,
  TextInputFieldOwnProps,
} from "evergreen-ui";
import React from "react";

const IconTextInputField: BoxComponent<TextInputFieldOwnProps, "input"> = ({
  children,
  ...props
}) => {
  return (
    <Pane position="relative">
      <TextInputField {...props} />
      {children && (
        <Pane
          position="absolute"
          zIndex={2}
          right={0}
          paddingRight={15}
          paddingLeft={15}
          top={16}
        >
          <>{children}</>
        </Pane>
      )}
    </Pane>
  );
};

export default IconTextInputField;
