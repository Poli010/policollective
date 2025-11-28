import { useState, useRef } from "react";
import { CloudUpload, X, CircleAlert } from "lucide-react";
import { format_fileSize } from "@/lib/formatFileSize/format_fileSize";
import { Progress } from "@/components/ui/progress";

export default function Multiple_Image({files, setFiles}) {
    const [isNotSupported, setIsnotSupported] = useState(false);
    const inputRef = useRef();

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);

        const validFiles = droppedFiles.filter(file =>
            file.type.startsWith("image/")
        );

        if (validFiles.length !== droppedFiles.length) {
            setIsnotSupported(true);
            return;
        }

        setFiles(prev => [...prev, ...validFiles]);
        setIsnotSupported(false);
    };


    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleBrowse = (e) => {
        const selectedFile = Array.from(e.target.files);
        const validFiles = selectedFile.filter(file =>
            file.type.startsWith("image/")
        );
        if (validFiles.length !== selectedFile.length) {
            setIsnotSupported(true);
            return;
        }
        else{
            setFiles(prev => [...prev, ...validFiles]);
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
                    multiple
                />
                <p className=" text-sm text-center flex flex-col items-center justify-center">
                    <CloudUpload size={50}/>
                    <span className="font-semibold">Drop your image or browse</span>
                    <span className="text-gray-500">Supports: PNG, JPG, JPEG, JFIF</span>
                    <span className="text-gray-500">Note: You can upload multiple images of your item here.</span>
                </p>
            </div>
            {isNotSupported && <p className="flex flex-row items-center justify-start bg-red-500 text-white p-2 mt-2 rounded-sm text-sm"><CircleAlert className="mr-1"/>Image type not supported. Please upload a JPG, JPEG, JFIF or PNG file.</p>}
            
            {files.length > 0 &&
                <div className="border border-gray-500 py-3 rounded-md px-2 mt-2">
                    {files.map((file, index) => (
                        <div>
                            <div key={index} className="relative flex items-center">
                                <img src={URL.createObjectURL(file)} alt="" className="w-15 h-20" />
                                <div className="ml-3 w-80">
                                    <p className="font-semibold text-sm mb-1 mt-1">{file.name}</p>
                                    <p className="text-gray-500 text-sm">{format_fileSize(file.size)}</p>
                                </div>
                                <X className="absolute right-2 top-1 cursor-pointer" onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}/>
                            </div>
                            <Progress value={30}/>
                        </div>
                    ))}
                </div>
            }
            
        </>

    );
}
