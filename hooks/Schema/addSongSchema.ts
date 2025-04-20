import * as yup from "yup";

const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const SUPPORTED_AUDIO_FORMATS = ["audio/mpeg", "audio/mp3", "audio/wav"];

export const addSongSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(20, "Title should be maximum 20 charecters")
    .min(3, "Title should be minimum 3 charecters"),
  imageFile: yup
    .mixed<File>()
    .required("Image is required")
    .test("fileType", "Unsupported image format", function (value) {
      const file = value as File;
      return file && SUPPORTED_IMAGE_FORMATS.includes(file.type);
    }),
  file: yup
    .mixed<File>()
    .required("Audio file is required")
    .test("fileType", "Unsupported audio format", function (value) {
      const file = value as File;
      return file && SUPPORTED_AUDIO_FORMATS.includes(file.type);
    })
});

export type addSongPayload = yup.InferType<typeof addSongSchema>;
