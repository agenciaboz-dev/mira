import "./style.scss"
import { ReactComponent as TutorialFocus } from "../../images/tutorial_focus.svg"
import { ReactComponent as Balloon } from "../../images/balloon.svg"
import { ReactComponent as AvatarBG } from "../../images/avatar_bg.svg"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import avatarWebp from "../../../src/images/mira_avatar.webp"
import { RectReadOnly } from "react-use-measure"

interface TutorialProps {
    iconPositions: RectReadOnly
}

export const TutorialMask: React.FC<TutorialProps> = ({ iconPositions }) => {
    const navigate = useNavigate()
    const storage = useLocalStorage()

    const focus_style: React.CSSProperties = {
        top: iconPositions.top - iconPositions.height/2,
        left: iconPositions.left - iconPositions.width/1.75,
    }

    const completeTutorial = () => {
        navigate("/scan")
        storage.set("has_accessed", true)
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
                        Caso queira adicionar um produto ao seu carrinho, basta clicar no botão indicado e mirar a sua câmera
                        em um QR Code de nossos produtos!
                    </p>
                </div>
            </div>
            <img className="avatar" src={avatarWebp} alt="" />
            <AvatarBG className="avatar-bg" />
        </div>
    )
}