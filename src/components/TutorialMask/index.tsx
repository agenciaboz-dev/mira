import "./style.scss"
import {ReactComponent as Avatar} from "../../images/mira_avatar_1.svg"
import {ReactComponent as BalloonTip} from "../../images/balloon_tip.svg"
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
            <div className="focus" onClick={ completeTutorial }></div>
            <div className="text-balloon">
                <p>Olá! Me chamo Mirazinha.<br />Caso queira adicionar um produto ao seu carrinho basta clicar no botão indicado e mirar a sua camera em um QR Code de nossos produtos!</p>
            </div>
            <BalloonTip className="balloon-tip"/>
            <Avatar className="avatar"/>
        </div>
    )
}