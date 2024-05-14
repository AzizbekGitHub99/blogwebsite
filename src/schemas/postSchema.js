import * as yup from "yup";

const postSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  tags: yup.string().required()
});

export default postSchema;
