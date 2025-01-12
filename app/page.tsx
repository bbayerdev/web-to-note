'use client'
// src/components/CustomForm.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Definindo o esquema de validação com Zod
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }),
});

// Criando o tipo a partir do esquema
type FormData = z.infer<typeof schema>;

const CustomForm = () => {
  // Inicializando o React Hook Form com o resolutor Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Função para lidar com o envio do formulário
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="input"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email" className="block">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="input"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="age" className="block">Age</label>
        <input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="input"
        />
        {errors.age && <span className="text-red-500">{errors.age.message}</span>}
      </div>

      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default CustomForm;
