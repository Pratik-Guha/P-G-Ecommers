import { Rating } from "@mui/material";

export default function CustomerReview() {
  const list = [
    {
      name: "Niko Robin",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, asperiores!",
      rating: 4.5,
      imageLink: "/cus1.jpg",
    },
    {
      name: "Dragon Lord",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, asperiores!",
      rating: 5,
      imageLink: "/cus2.jpg",
    },
    {
      name: "Rihana Guha",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, asperiores!",
      rating: 4.5,
      imageLink: "/cus3.jpg",
    },
    {
      name: "Monkey D. Luffy",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, asperiores!",
      rating: 5,
      imageLink: "/cus4.png",
    },
  ];
  return (
    <section className="flex  justify-center mt-4">
      <div className="md:max-w-[900px] w-full flex flex-col gap-3 p-4">
        <h1 className="text-center font-bold text-2xl py-2">Our Customer Review</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {list?.map((item) => (
          <div key={item.name} {...item} className="flex flex-col gap-2 p-4 border rounded-lg justify-center items-center">
            <img className="h-32 w-32 object-cover rounded-full" src={item.imageLink} alt={item.name} />
            <h1 className="text-base font-semibold">{item.name}</h1>

            <Rating
              name="product-rating"
              defaultValue={2.5}
              precision={item?.rating}
              size="small"
              sx={{
                  "& .MuiRating-iconEmpty": {
                      color: "#ccc", // Set empty star color for dark mode
                    },
                }}
                readOnly
                />
                <p className="text-sm text-center text-gray-400">{item.message}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
