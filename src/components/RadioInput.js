import React from 'react'




const genderOptions = ["Male", "Female"];
const RadioInput = () => {

  return (
    {genderOptions.map((option) => {
        const selected = option === gender;
        return (
          <Pressable
            onPress={() => setGender(option)}
            key={option}
            style={styles.radioContainer}
          >
            <View
              style={[
                styles.outerCircle,
                selected && styles.selectedOuterCircle,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  selected && styles.selectedInnerCircle,
                ]}
              ></View>
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </Pressable>
        );
      })}

  )
}

export default RadioInput