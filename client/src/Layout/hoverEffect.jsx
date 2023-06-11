import {motion} from "framer-motion";

const HoverEffect = ({ children }) => {

    return (
        <motion.div
            //whileHover={{ scale: 1.05, rotate: 0 }}
            whileTap={{
                scale: 1.05,
                rotate: 0,
                borderRadius: "100%"
            }}
        >
            {children}
        </motion.div>
    )
}

export default HoverEffect