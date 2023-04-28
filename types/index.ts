type DrinkType = "BEER" | "DRINK";

interface Order {
  userId: string;
  drink: DrinkType;
}
