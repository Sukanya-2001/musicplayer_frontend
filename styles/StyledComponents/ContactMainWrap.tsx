import { Box, styled } from "@mui/material";

export const ContactMainWrap = styled(Box)`
  padding-top: 60px;
  color: white;
  .left_part {
    .contactAlignment {
      /* @media (max-width: 899px) {
        display: flex;
        justify-content: center;
      } */
    }
    ul {
      margin-top: 30px;
      li {
        padding: 0;
        i {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;
          margin-right: 10px;
        }
        :not(:last-child) {
          margin-bottom: 24px;
        }
      }
      .rgt_content {
        p,
        a {
          font-size: 18px;
          font-weight: 300;
          color: rgb(255 14 188);
        }
        a {
          color: ${({ theme }) => theme.palette.text.secondary};
          &:hover {
            color: ${({ theme }) => theme.palette.text.disabled};
          }
        }
      }
    }
  }
  .rgt_part {
    backgroundcolor: "rgba(0, 0, 0, 0.6)";
    backdrop-filter: blur(10px);
    margin-top: 30px;
    border-radius: 14.233px;
    @media (max-width: 899px) {
      backgroundcolor: "rgba(0, 0, 0, 0.6)";
    }
  }

  .detailsInputWrapper {
    .MuiStack-root {
      height: auto;
    }
  }
`;
