import { FormProvider } from "@/components/FormContext";
import FormContainer from "../components/FormContainer";

export default async function Home() {
  return (
    <div>
      <FormProvider>
        <FormContainer />
      </FormProvider>
    </div>
  );
}