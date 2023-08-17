import "./style.scss"
import { ReactComponent as TutorialFocus } from "../../images/tutorial_focus.svg"
import { ReactComponent as Balloon } from "../../images/balloon.svg"
import { ReactComponent as AvatarBG } from "../../images/avatar_bg.svg"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import avatarWebp from "../../../src/images/mira_avatar.webp"
import { RectReadOnly } from "react-use-measure"
import CancelIcon from '@mui/icons-material/Cancel';

interface TutorialProps {
    iconPositions: RectReadOnly
}

export const TutorialMask: React.FC<TutorialProps> = ({ iconPositions }) => {
    const navigate = useNavigate()
    const storage = useLocalStorage()

    const focus_style: React.CSSProperties = {
        top: iconPositions.top - iconPositions.height * 1.25,
        left: iconPositions.left - iconPositions.width * 1.25,
    }

    const completeTutorial = () => {
        navigate("/scan")
        storage.set("has_accessed", true)
    }

    const closeTutorial = () => {
        storage.set("has_accessed", true)
        window.location.reload()
    }

    return (
        <div className="tutorial-mask">
            <TutorialFocus style={focus_style} className="focus" onClick={completeTutorial} />
            <div className="balloon-container">
                <Balloon className="balloon" />
                <div className="balloon-text">
                    <p>
                        Olá! Me chamo Mira.
                        <br />
                        Caso queira adicionar um produto ao seu carrinho, basta clicar no botão indicado (à direita superior, em formato de QR Code) e mirar a sua câmera
                        em um QR Code de nossos produtos; ou então, utilize a ferramenta de busca (à direita inferior, em formato de lupa).
                    </p>
                </div>
            </div>
            <img className="avatar" src={avatarWebp} alt="" />
            <AvatarBG className="avatar-bg" />
            <div className="close-tutorial-button" onClick={closeTutorial}>
                <CancelIcon className="cancel-icon" />
                <p>Fechar</p>
            </div>
        </div>
    )
}