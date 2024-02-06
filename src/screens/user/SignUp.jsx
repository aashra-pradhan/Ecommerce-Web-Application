import { useForm } from "react-hook-form";
import { object, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SchemaSignUp } from "./user.schema";
function SignUp() {
  const {
    register,
    handleSubmit,
    onBlur,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaSignUp),
  });

  return (
    <>
      <div className="bg-orange-400	h-[650px] w-[800px] rounded-lg border-4 border-black">
        <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
          Signup form
        </p>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          {console.log("heyy")}
          <div>
            <Input
              labelname={"Fullname"}
              type={"text"}
              register={register}
              errors={errors}
              onBlur={onBlur}
              name={"fullname"}
            />
          </div>
          <div>
            <Input
              labelname={"Email"}
              type={"text"}
              register={register}
              errors={errors}
              onBlur={onBlur}
              name={"email"}
            />
          </div>
          <div>
            <Input
              labelname={"Password"}
              type={"password"}
              register={register}
              errors={errors}
              onBlur={onBlur}
              name={"password"}
            />
          </div>
          <div>
            <Input
              labelname={"Contactno"}
              type={"text"}
              register={register}
              errors={errors}
              onBlur={onBlur}
              name={"contactno"}
            />
          </div>

          <div>
            <input type="checkbox" className="mt-8" />
            <label
              className="inline text-thin font-serif text-slate-950"
              htmlFor=""
            >
              I agree to all the privacy terms and conditions
            </label>
          </div>

          <div>
            <Button type={"submit"} value={"Submit"} />
          </div>

          {/* Email
          <input type="text" />
          
          Password
          <input type="password" /> 
          Contact number
          <input type="text" />  */}
        </form>
      </div>
    </>
  );
}

export default SignUp;
