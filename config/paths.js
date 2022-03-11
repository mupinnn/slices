import { fileURLToPath } from "url";

const paths = {
  src: fileURLToPath(new URL("../src", import.meta.url)),
  build: fileURLToPath(new URL("../dist", import.meta.url)),
};

export default paths;
