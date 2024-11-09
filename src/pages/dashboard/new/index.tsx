import { ChangeEvent, useState, useContext } from "react";
import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelheader";
import { FiTrash, FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";
import { storage, db } from "../../../services/firebaseConection";
import toast from "react-hot-toast"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const schema = z.object({
  name: z.string().min(2, "O campo nome é obrigatório"),
  model: z.string().min(2, "O modelo é obrigatório"),
  year: z.string().min(2, "O ano do carro é obrigatório"),
  km: z.string().min(2, "O KM do carro é obrigatório"),
  price: z.string().min(2, "O valor do carro é obrigatório"),
  city: z.string().min(2, "A cidade é obrigatório"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Número de telefone invalido.",
    }),
  description: z.string().min(2, "A descrição é obrigatória"),
});

type FormData = z.infer<typeof schema>;

interface ImagemItemProps {
  uid: string;
  name: string;
  url: string;
  previewUrl: string;
}

export function New() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [carImages, setCarImages] = useState<ImagemItemProps[]>([]);

  function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      toast.error("Envie pelo menos uma imagem");
      return;
    }

    const carListImages = carImages.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });

    addDoc(collection(db, "cars"), {
      name: data.name.toUpperCase(),
      model: data.model,
      year: data.year,
      km: data.km,
      description: data.description,
      price: data.price,
      city: data.city,
      whatsapp: data.whatsapp,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImages,
    })
      .then(() => {
        reset();
        setCarImages([]);
        toast.success("Carro cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao cadastrar carro");
      });
  }

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      console.log(image);

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);

        console.log("Imagem válida");
      } else {
        return;
        console.log("Imagem inválida");
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }
    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imagemItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        };
        setCarImages((images) => [...images, imagemItem]);
        toast.success("Imagem enviada com sucesso!");
      });
    });
  }

  async function handleDeleteImage(item: ImagemItemProps) {
    const imagePath = `images/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImages(carImages.filter((car) => car.url !== item.url));
    } catch (error) {
      console.log("Erro ao excluir imagem:", error);
    }
  }

  return (
    <Container>
      <DashboardHeader />
      <div className=" w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 ">
        <button className="border-2 w-48 rounde-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48 ">
          <div className="absolute  cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
        </button>
        {carImages.map((item) => (
          <div
            key={item.name}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <button
              className="absolute"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash size={28} color="#fff" />
            </button>
            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-32 object-cover "
              alt="foto do carro"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounde-lg flex flex-col sm:flex-row gap-2 mt-2">
        <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="mb-2 font-medium">
              Nome do carro
            </label>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Onix 1.0..."
            />
          </div>

          <div className="mb-3">
            <label htmlFor="model" className="mb-2 font-medium">
              Modelo do carro
            </label>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0 Flex Plus Manual"
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label htmlFor="year" className="mb-2 font-medium">
                Ano do carro
              </label>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2022/2022"
              />
            </div>
            <div className="w-full">
              <label htmlFor="km" className="mb-2 font-medium">
                KM rodados
              </label>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 23.900..."
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <label htmlFor="whatsapp" className="mb-2 font-medium">
                Telefone / Whatsapp
              </label>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 71996783434"
              />
            </div>
            <div className="w-full">
              <label htmlFor="city" className="mb-2 font-medium">
                Cidade
              </label>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Salvador/Ba"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="mb-2 font-medium">
              Preço do carro
            </label>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="Ex: 90.000"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="mb-2 font-medium">
              Descrição
            </label>
            <textarea
              className="border-2 w-full rounded-lg h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição sobre o carro..."
            />
            {errors.description && (
              <p className="mb-1 text-red-500">{errors.description.message}</p>
            )}
          </div>
          <button className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium">
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
