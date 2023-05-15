import "./style.scss"
import { ReactComponent as TutorialFocus } from "../../images/tutorial_focus.svg"
import { ReactComponent as Balloon } from "../../images/balloon.svg"
import { ReactComponent as Avatar } from "../../images/mira_avatar_2.svg"
import { ReactComponent as AvatarBG } from "../../images/avatar_bg.svg"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"

export const TutorialMask = ({ }) => {

    const navigate = useNavigate()
    const storage = useLocalStorage()

    const completeTutorial = () => {
        navigate("/scan")
        storage.set('has_accessed', true)
    }

    return (
        <div className="tutorial-mask">
            <div></div>
                <TutorialFocus className="focus" onClick={ completeTutorial } />
            <div className="balloon-container">
                <Balloon className="balloon" />
                <div className="balloon-text">
                    <p>Olá! Me chamo Mirinha.<br />Caso queira adicionar um produto ao seu carrinho, basta clicar no botão indicado e mirar a sua câmera em um QR Code de nossos produtos!</p>
                </div>
            </div>
            <Avatar className="avatar"/>
            <AvatarBG className="avatar-bg" />
        </div>
    )
}