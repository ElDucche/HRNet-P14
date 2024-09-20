import { useEffect, useState } from "react"

interface ModalProps {
    state: boolean
    message: string
}


const Modal = ({state, message}: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(state)
    }, [state])

    document.addEventListener('click', (e) => {
        if (e.target !== document.getElementById('modal')) {
            setIsOpen(false)
        }
    })
    
    return (
        <div className={`fixed inset-0 bg-white/50 backdrop-blur-sm z-50 ${isOpen ? "block" : "hidden"}`}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg border drop-shadow-sm" id='modal'>
                <div className="relative grid place-items-center place-content-center">
                    <h3 className="text-xl font-medium">{message}</h3>
                    <button onClick={() => setIsOpen(false)} className="aspect-square border bg-slate-50 rounded-full w-6 h-6 my-4 flex justify-center items-center hover:bg-slate-200 rotate-45 transition-all absolute -left-6 -top-10">+</button>
                </div>
            </div>
        </div>
    )
}

export default Modal