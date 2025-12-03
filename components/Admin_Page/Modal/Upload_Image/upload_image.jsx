import { useState, useRef } from "react";
import { CloudUpload, X, CircleAlert } from "lucide-react";
import { format_fileSize } from "@/lib/formatFileSize/format_fileSize";
import { Progress } from "@/components/ui/progress";

export default function Upload_Image({file, setFile, mainProgress}) {

    const [isNotSupported, setIsnotSupported] = useState(false);
    const inputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if(!droppedFile) return;
        if(!droppedFile.type.startsWith("image/")){
            setIsnotSupported(true);
            e.target.value = null;
        }
        else{
            setFile(droppedFile);
            setIsnotSupported(false);
        }
       
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleBrowse = (e) => {
        const selectedFile = e.target.files[0];
        if(!selectedFile) return;

        if(!selectedFile.type.startsWith("image/")){
            setIsnotSupported(true);
            e.target.value = null;
        }
        else{
            setFile(selectedFile);
            setIsnotSupported(false);
        }
        
    };

    return (
        <>
            <div className="border-2 border-dashed border-gray-500 rounded-lg p-5 text-center cursor-pointer"
                onClick={() => inputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleBrowse}
                    accept="image/*"
                />
                <p className=" text-sm text-center flex flex-col items-center justify-center">
                    <CloudUpload size={50}/>
                    <span className="font-semibold">Drop your image or browse</span>
                    <span className="text-gray-500">Supports: PNG, JPG, JPEG, JFIF</span>
                    <span className="text-gray-500">Note: This will be the main/thumbnail image of the item.</span>
                </p>
            </div>
            {isNotSupported && <p className="flex flex-row items-center justify-start bg-red-500 text-white p-2 mt-2 rounded-sm text-sm"><CircleAlert className="mr-1"/>Image type not supported. Please upload a JPG, JPEG, JFIF or PNG file.</p>}
            
            {file &&
                <div className="border border-gray-500 py-3 rounded-md px-2 mt-2">
                    <div className="relative flex items-center mb-3">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-15 h-20" />
                        <div className="ml-3 w-80">
                            <p className="font-semibold text-sm mb-1 mt-1">{file.name}</p>
                            <p className="text-gray-500 text-sm">{format_fileSize(file.size)}</p>
                        </div>
                        <X className="absolute right-2 top-1 cursor-pointer" onClick={() => setFile(null)}/>
                    </div>
                    <Progress value={mainProgress}/>
                </div>
            }
            
        </>

    );
}
