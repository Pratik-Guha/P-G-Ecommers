export default function Images({data,setFeatureImage,featureImage,imageList, setImageList}) {

    return (
        <section className="bg-gray-400 rounded-xl flex-1 p-4 border-2 flex flex-col gap-3">
            <h1 className="font-semibold">Images</h1>
            <div className="flex flex-col gap-1">
                {
                    data?.featureImageURL && !featureImage && (<div className="flex justify-center rounded-lg">
                    <img className="h-20 w-20 object-cover" src={data?.featureImageURL} alt={featureImage?.name }/>
                </div>)
                }
              {
                featureImage && 
                <div className="flex justify-center rounded-lg">
                    <img className="h-20 w-20 object-cover" src={URL.createObjectURL(featureImage)} alt={featureImage?.name }/>
                </div>
              }             
              <label htmlFor="product-feature-image" className=" text-sm  ">
                    Feature Image <span className="text-red-500">*</span>
                    </label>
                <input 
                    type="file"
                    placeholder="Enter feature Image" id="product-feature-image" name="product-feature-image"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none bg-slate-300"
                    
                    onChange={(e)=>{
                        if(e.target.files.length>0){
                            setFeatureImage(e.target.files[0])
                        }
                    }}
                />
            </div>
            <div className="flex flex-col gap-1">
            {
                (imageList?.length===0) && data?.imageList?.length!==0 &&
                          (<div className="flex flex-wrap gap-3" >{
                            data?.imageList?.map((item)=>{
                                return (
                                        <img className="h-20 w-20 object-cover rounded-lg" src={item} alt={item?.name } key={item?.id}/>
                                    )
                            })}
                           
                    
                        </div>)
                }
                {
                    imageList?.length>0 && 
                          (<div className="flex flex-wrap gap-3" >{
                            imageList?.map((item)=>{
                                return (
                                        <img className="h-20 w-20 object-cover rounded-lg" src={URL.createObjectURL(item)} alt={item?.name } key={item?.id}/>
                                    )
                            })}
                           
                    
                        </div>)
                }
                <label htmlFor="product-images" className=" text-sm  ">
                     Images <span className="text-red-500">*</span>
                    </label>
                <input 
                    type="file"multiple
                    id="product-images" name="product-images"
                    className="border border-gray-400 px-4 py-2 rounded-lg w-full outline-none bg-slate-300"
                    
                    onChange={(e)=>{
                        const newFiles=[]
                        for(let i=0;i<e.target.files.length;i++){
                            newFiles.push(e.target.files[i])
                        }
                        setImageList(newFiles)
                    }}
                />
            </div>
        </section>
    )
}