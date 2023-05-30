abstract class StringHelperFunctions  {
    static convertSnakeToCamelCase(snakeCaseString: string): string {
        if (snakeCaseString.includes('_')) {
          return snakeCaseString.replace(/_([a-z])/g, (match, letter) => 
            letter.toUpperCase());
        }
      
        return snakeCaseString;
    }
}

export default StringHelperFunctions;
