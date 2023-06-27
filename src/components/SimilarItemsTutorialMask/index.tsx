import "./style.scss"
import { ReactComponent as TutorialFocus } from "../../images/tutorial_focus.svg"
import { ReactComponent as Balloon } from "../../images/balloon.svg"
import { ReactComponent as AvatarBG } from "../../images/avatar_bg.svg"
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import avatarWebp from "../../../src/images/mira_avatar.webp"

export const SimilarItemsTutorialMask = () => {
    const navigate = useNavigate()
    const storage = useLocalStorage()

    const focus_style: React.CSSProperties = {
        top: "0.75vw",
        left: "0.75vw",
    }

    const completeSimilarItemsTutorial = () => {
        navigate("/scan")
        storage.set("mira.seen_similar_items_tutorial", true)
    }

    return (
        storage.get("mira.seen_similar_items_tutorial") ? null :
        <div className="similar_items_tutorial-mask" onClick={completeSimilarItemsTutorial} >
            <TutorialFocus style={focus_style} className="focus"/>
            <div className="balloon-container">
                <Balloon className="balloon" />
                <div className="balloon-text">
                    <p>
                        Caso queira ver produtos similares, basta clicar no botão indicado!
                    </p>
                </div>
            </div>
            <img className="avatar" src={avatarWebp} alt="" />
            <AvatarBG className="avatar-bg" />
        </div>
    )
}