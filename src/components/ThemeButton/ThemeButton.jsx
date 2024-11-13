
import { IoIosColorPalette } from "react-icons/io";
import css from './ThemeButton.module.css'
import { useTheme } from "./ThemeContext";
export default function ThemeButton() {
    const { toggleTheme } = useTheme(); 

    return (
        <div className={css.wrapper}>
<button className={css.btn} type="button" onClick={toggleTheme}>
<IoIosColorPalette />
</button>

        </div>
    )
}