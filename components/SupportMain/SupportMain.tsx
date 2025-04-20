import { useUserSupportForm } from "@/api/functions/support.api";
import { SupportPayload, supportSchema } from "@/hooks/Schema/supportSchema";
import { ContactMainWrap } from "@/styles/StyledComponents/ContactMainWrap";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CallIcon from "@/ui/Icons/CallIcon";
import LocationIcon from "@/ui/Icons/LocationIcon";
import MailIcon from "@/ui/Icons/MailIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid2,
  List,
  ListItem,
  Typography
} from "@mui/material";
import { useForm } from "react-hook-form";

const SupportMain = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<SupportPayload>({
    resolver: yupResolver(supportSchema)
  });
  const { mutateAsync: contactMutate, isPending: formPending } =
    useUserSupportForm();

  const onSubmit = (data: SupportPayload) => {
    contactMutate(data, {
      onSuccess: (res) => {
        if (res?.status === 200) {
          reset({
            full_name: "",
            email: "",
            ph_no: "",
            details: ""
          });
        }
      }
    });
  };

  return (
    <ContactMainWrap>
      <Container fixed>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center"
          }}
        >
          <>
            <Typography
              variant="h2"
              color="white"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "18px", // small devices
                  sm: "20px", // tablets
                  md: "25px" // desktops
                }
              }}
            >
              We'd love to hear from you — reach out anytime
            </Typography>
            <Typography
              variant="h2"
              color="white"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "15px", // small devices
                  sm: "16px", // tablets
                  md: "20px" // desktops
                }
              }}
            >
              we'll get back to you as soon as we can
            </Typography>
            <Divider
              sx={{ backgroundColor: "white", width: "50%", mx: "auto" }}
            />
          </>
        </Box>
        <Grid2 container spacing={5}>
          <Grid2 size={{ lg: 6, md: 6, xs: 12 }}>
            <Box className="left_part">
              <Box className="contactAlignment">
                <List>
                  <ListItem>
                    <i>
                      <LocationIcon />
                    </i>
                    <Box className="rgt_content">
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "600 !important"
                        }}
                      >
                        Address
                      </Typography>
                      {/* {settingPending ? (
                        <Skeleton variant="text" width={250} height={30} />
                      ) : (
                        <Typography>
                          {settingDetails?.contact_address ?? ""}
                        </Typography>
                      )} */}
                      <Typography>Newtown, North 24 parganas</Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <i>
                      <CallIcon />
                    </i>
                    <Box className="rgt_content">
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "600 !important"
                        }}
                      >
                        Phone Number
                      </Typography>
                      {/* {settingPending ? (
                        <Skeleton variant="text" width={100} height={30} />
                      ) : (
                        <Link
                          href={`tel:${settingDetails?.contact_mobile_number}`}
                        >
                          <Typography>
                            {settingDetails?.contact_mobile_number ?? ""}
                          </Typography>
                        </Link>
                      )} */}
                      <Typography variant="body1">7762189045</Typography>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <i>
                      <MailIcon />
                    </i>
                    <Box className="rgt_content">
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "600 !important"
                        }}
                      >
                        Email Address
                      </Typography>
                      {/* {settingPending ? (
                        <Skeleton variant="text" width={150} height={30} />
                      ) : (
                        <Link href={`mailto:${settingDetails?.contact_email}`}>
                          <Typography>
                            {settingDetails?.contact_email ?? ""}
                          </Typography>
                        </Link>
                      )} */}
                      <Typography>admin@email.com</Typography>
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid2>
          <Grid2 size={{ lg: 6, md: 6, xs: 12 }}>
            <Box className="rgt_part">
              {/* <Typography
                variant="h3"
                sx={{
                  fontSize: "28px",
                  fontWeight: "500",
                  marginBottom: "30px"
                }}
              >
                Get In Touch
              </Typography> */}
              <Box className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid2 container spacing={2}>
                    <Grid2 size={{ lg: 12, xs: 12 }}>
                      <InputFieldCommon
                        placeholder="Enter full name"
                        {...register("full_name")}
                      />
                      {!!errors?.full_name && (
                        <Typography
                          sx={{ fontSize: "15px", paddingTop: "5px" }}
                          color="error"
                        >
                          {" "}
                          {errors.full_name?.message as string}
                        </Typography>
                      )}
                    </Grid2>
                    <Grid2 size={{ lg: 12, xs: 12 }}>
                      <InputFieldCommon
                        placeholder="Enter email address"
                        {...register("email")}
                      />
                      {!!errors?.email && (
                        <Typography
                          sx={{ fontSize: "15px", paddingTop: "5px" }}
                          color="error"
                        >
                          {" "}
                          {errors.email?.message as string}
                        </Typography>
                      )}
                    </Grid2>
                    <Grid2 size={{ lg: 12, xs: 12 }}>
                      <InputFieldCommon
                        placeholder="Enter Phone no."
                        {...register("ph_no")}
                      />
                      {!!errors?.ph_no && (
                        <Typography
                          sx={{ fontSize: "15px", paddingTop: "5px" }}
                          color="error"
                        >
                          {" "}
                          {errors.ph_no?.message as string}
                        </Typography>
                      )}
                    </Grid2>
                    <Grid2
                      size={{ lg: 12, xs: 12 }}
                      className="detailsInputWrapper"
                    >
                      <InputFieldCommon
                        placeholder="Type here..."
                        rows={4}
                        multiline
                        className="detailsInput"
                        {...register("details")}
                      />
                      {!!errors?.details && (
                        <Typography
                          sx={{ fontSize: "15px", paddingTop: "5px" }}
                          color="error"
                        >
                          {" "}
                          {errors.details?.message as string}
                        </Typography>
                      )}
                    </Grid2>
                  </Grid2>
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formPending}
                    sx={{ marginTop: "18px" }}
                  >
                    {formPending ? <CircularProgress size={18} /> : "Submit"}
                  </CustomButtonPrimary>
                </form>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </ContactMainWrap>
  );
};

export default SupportMain;

// background: ${({ theme }) => theme.palette.customColors?.colorGreay};
