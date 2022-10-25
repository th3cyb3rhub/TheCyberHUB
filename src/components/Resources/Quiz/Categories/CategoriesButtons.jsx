import { CategoriesButtonData } from "./CategoriesButtonData";
import { CategoriesSection, MobileCategories, CategoriesButton, CategoriesButtonMobile } from "./CategoriesElements";
import { FaThList, FaWindowClose } from "react-icons/fa";

export default function CategoriesButtons({
  categoryToShow,
  showCategory,
  handleResetButton,
  score,
  openDropdown,
  closeDropdown,
  showDropdown,
}) {
  const buttonsArray = CategoriesButtonData.map((data, i) => {
    const styles = {
      background: data.type === categoryToShow ? "transparent" : "",
      color: data.type === categoryToShow ? "#20c20e" : "",
    };

    return (
      <CategoriesButton
        key={i}
        onClick={() => {
          showCategory(data.type);
          handleResetButton(score);
          closeDropdown();
        }}
        style={styles}
        type={data.type}
        show={categoryToShow}
      >
        {data.value}
      </CategoriesButton>
    );
  });

  const buttonsArrayMobile = CategoriesButtonData.map((data, i) => {
    const styles = {
      background: data.type === categoryToShow ? "#cecac3" : "",
      color: data.type === categoryToShow ? "#010606" : "",
    };

    return (
      <CategoriesButtonMobile
        key={i}
        onClick={() => {
          showCategory(data.type);
          handleResetButton(score);
          closeDropdown();
        }}
        style={styles}
        type={data.type}
        show={categoryToShow}
      >
        {data.value}
      </CategoriesButtonMobile>
    );
  });

  return (
    <section>
      <CategoriesSection>
        {!showDropdown ? (
          <span onClick={() => openDropdown()}>
            <FaThList />
          </span>
        ) : (
          <span onClick={() => closeDropdown()}>
            <FaWindowClose />
          </span>
        )}
        {buttonsArray}
      </CategoriesSection>
      {showDropdown && (
        <section>
          <MobileCategories>{buttonsArrayMobile}</MobileCategories>
        </section>
      )}
    </section>
  );
}
