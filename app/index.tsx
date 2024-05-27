import BottomLoginSheet from "@/components/BottomLoginSheet";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function Index() {
  const context = useAppContext();
  const scale = useSharedValue(1);

  // Create an animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Start the animation when the component mounts
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);
  }, []);

  const initialText = "Let's get started   ";
  const [displayText, setDisplayText] = useState(initialText);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        if (prevText.length > 0) {
          return prevText.slice(0, -1);
        } else {
          // If the text is empty, reset it to the initial text
          return initialText;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <View className="flex-1 justify-center items-center relative bg-slate-200">
      <View className="flex-row items-center mb-[40%]">
        <Text className="text-xl"> {displayText} </Text>
        <Animated.Text className="text-4xl font-bold" style={animatedStyle}>
          |
        </Animated.Text>
      </View>
      <BottomLoginSheet />
    </View>
  );
}
