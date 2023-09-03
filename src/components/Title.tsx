import styles from "@arweave-wallet-kit/styles/text/title.module.css";
import { DefaultTheme, unifyClassNames, withTheme } from "../theme";
import { rgbToString } from "@arweave-wallet-kit/core/theme";
import { styled } from "@linaria/react";
import type { HTMLProps } from "react";

export const Title = withTheme(styled.h1<{
  small?: boolean;
  themed?: boolean;
  theme: DefaultTheme;
}>`
  display: flex;
  font-family: "Manrope", sans-serif;
  font-size: ${(props) => (props.small ? "1.05rem" : "1.2rem")};
  font-weight: 600;
  color: rgb(
    ${(props) => {
      if (!props.themed) {
        return props.theme.primaryText;
      }

      return rgbToString(props.theme.themeConfig.titleHighlight);
    }}
  );
  cursor: ${(props) => (props.themed ? "pointer" : "text")};
  align-items: center;
  gap: 0.34rem;
  margin: 0;
  transition: color 0.23s ease-in-out;
`);

export const TitleWithParagraph = ({ children, className, ...props }: HTMLProps<HTMLDivElement>) => (
  <div
    className={unifyClassNames(styles.withParagraph, className || "")}
    {...props}
  >
    {children}
  </div>
);
