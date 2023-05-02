import Button from "components/shared/library/components/Button-v1/Button";
import { Flex } from "components/shared/library/components/Flex-v1";
import { Box } from "components/shared/library/components/Box-v1";

interface IProps {
  setEditable: (value: boolean) => void;
  isActive: boolean;
  handleStatusUpdate: () => void;
}

function HeaderActions(props: IProps) {
  const { setEditable, isActive, handleStatusUpdate } = props;

  return (
    <Flex container justifyContent="end" backgroundColor="none">
      <Box mr="5px" backgroundColor="none">
        {
          <>
            <Button
              color="danger"
              variant="outline"
              onClick={handleStatusUpdate}
            >
              BLACK LIST USER
            </Button>
          </>
        }
      </Box>

      <Box mr="5px">
        <Button color="primary" variant="outline" onClick={handleStatusUpdate}>
          ACTIVATE USER
        </Button>
      </Box>
    </Flex>
  );
}

export default HeaderActions;
